import { copyFile, lstat, mkdtemp, rmdir, stat, unlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { basename, isAbsolute, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

import sharp from 'sharp';

const projectRoot = fileURLToPath(new URL('../', import.meta.url));
const assetsRoot = resolve(projectRoot, 'src/assets/images');
const shouldWrite = process.argv.includes('--write');

const targets = [
  {
    path: 'Portadas/ColeccionDeSuenos.webp',
    width: 2560,
    height: 2560,
    expectedWidth: 4220,
    expectedHeight: 2964,
  },
  {
    path: 'caratulas/se-fue-el-verano/SeFueElVerano.webp',
    width: 2560,
    height: 2560,
    expectedWidth: 4000,
    expectedHeight: 4000,
  },
  {
    path: 'collages/ColeccionDeSuenos/DSC06152.webp',
    width: 1600,
    height: 1600,
    expectedWidth: 3376,
    expectedHeight: 6000,
  },
  {
    path: 'collages/ColeccionDeSuenos/IMG_8230.webp',
    width: 1600,
    height: 1600,
    expectedWidth: 6000,
    expectedHeight: 3376,
  },
  {
    path: 'Portadas/jassy-tocando.webp',
    width: 1600,
    height: 1600,
    expectedWidth: 6000,
    expectedHeight: 4000,
  },
  {
    path: 'collages/SeFueElVerano/jassydj.webp',
    width: 1600,
    height: 1600,
    expectedWidth: 4000,
    expectedHeight: 6000,
  },
  {
    path: 'Portadas/banda_temporada1.webp',
    width: 1600,
    height: 1600,
    expectedWidth: 3120,
    expectedHeight: 4680,
  },
  {
    path: 'collages/ColeccionDeSuenos/jassy-004.webp',
    width: 1600,
    height: 1600,
    expectedWidth: 6000,
    expectedHeight: 3376,
  },
  {
    path: 'collages/ColeccionDeSuenos/IMG_8783.webp',
    width: 1600,
    height: 1600,
    expectedWidth: 3120,
    expectedHeight: 4680,
  },
  {
    path: 'collages/ColeccionDeSuenos/IMG_6879.webp',
    width: 1600,
    height: 1600,
    expectedWidth: 3120,
    expectedHeight: 4680,
  },
  {
    path: 'DesdeElSur/jassy_solo.webp',
    width: 1600,
    height: 1600,
    expectedWidth: 2864,
    expectedHeight: 4296,
  },
  {
    path: 'collages/ColeccionDeSuenos/jassy_naranja.webp',
    width: 1600,
    height: 1600,
    expectedWidth: 3120,
    expectedHeight: 4680,
  },
  {
    path: 'collages/ColeccionDeSuenos/IMG_6774.webp',
    width: 1600,
    height: 1600,
    expectedWidth: 3120,
    expectedHeight: 4680,
  },
  {
    path: 'Portadas/portada-ver2.webp',
    width: 1024,
    height: 1536,
    expectedWidth: 1024,
    expectedHeight: 1536,
  },
  {
    path: 'collages/ColeccionDeSuenos/jassy_mafioso.webp',
    width: 1600,
    height: 1600,
    expectedWidth: 2268,
    expectedHeight: 4032,
  },
  {
    path: 'collages/ColeccionDeSuenos/IMG_6779.webp',
    width: 1600,
    height: 1600,
    expectedWidth: 3120,
    expectedHeight: 4680,
  },
];

const uniqueTargets = new Set(targets.map((target) => target.path));
if (uniqueTargets.size !== targets.length) {
  throw new Error('The image manifest contains duplicate paths.');
}

const temporaryDirectory = await mkdtemp(join(tmpdir(), 'jassy-image-optimization-'));
const generatedFiles = [];

try {
  for (const [index, target] of targets.entries()) {
    const inputPath = resolve(assetsRoot, target.path);
    const relativePath = relative(assetsRoot, inputPath);

    if (isAbsolute(relativePath) || relativePath === '..' || relativePath.startsWith(`..${sep}`)) {
      throw new Error(`Image target escapes the assets directory: ${target.path}`);
    }

    const inputFile = await lstat(inputPath);
    if (!inputFile.isFile() || inputFile.isSymbolicLink()) {
      throw new Error(`Image target is not a regular file: ${target.path}`);
    }

    const inputMetadata = await sharp(inputPath).metadata();
    const isExpectedSource =
      inputMetadata.format === 'webp' &&
      inputMetadata.width === target.expectedWidth &&
      inputMetadata.height === target.expectedHeight;
    const isAlreadyWithinLimits =
      inputMetadata.format === 'webp' &&
      inputMetadata.width &&
      inputMetadata.height &&
      inputMetadata.width <= target.width &&
      inputMetadata.height <= target.height;

    if (!isExpectedSource && !isAlreadyWithinLimits) {
      throw new Error(
        `Unexpected source metadata for ${target.path}: ` +
          `${inputMetadata.format} ${inputMetadata.width}x${inputMetadata.height}`,
      );
    }

    if (!isExpectedSource && isAlreadyWithinLimits) {
      generatedFiles.push({
        ...target,
        inputPath,
        outputPath: undefined,
        beforeBytes: inputFile.size,
        afterBytes: inputFile.size,
        outputWidth: inputMetadata.width,
        outputHeight: inputMetadata.height,
        replace: false,
        alreadyOptimized: true,
      });
      continue;
    }

    const outputPath = join(temporaryDirectory, `${index}-${basename(target.path)}`);
    await sharp(inputPath)
      .autoOrient()
      .resize({
        width: target.width,
        height: target.height,
        fit: 'inside',
        withoutEnlargement: true,
      })
      .webp({
        quality: 82,
        effort: 6,
        preset: 'photo',
        smartSubsample: true,
      })
      .toFile(outputPath);

    const outputMetadata = await sharp(outputPath).metadata();
    const outputFile = await stat(outputPath);
    if (
      outputMetadata.format !== 'webp' ||
      !outputMetadata.width ||
      !outputMetadata.height ||
      outputMetadata.width > target.width ||
      outputMetadata.height > target.height ||
      outputFile.size === 0
    ) {
      throw new Error(`Invalid optimized image generated for ${target.path}.`);
    }

    generatedFiles.push({
      ...target,
      inputPath,
      outputPath,
      beforeBytes: inputFile.size,
      afterBytes: outputFile.size,
      outputWidth: outputMetadata.width,
      outputHeight: outputMetadata.height,
      replace: outputFile.size < inputFile.size,
    });
  }

  if (shouldWrite) {
    for (const image of generatedFiles) {
      if (image.replace) {
        await copyFile(image.outputPath, image.inputPath);
      }
    }
  }

  console.table(
    generatedFiles.map((image) => ({
      image: image.path,
      beforeKB: Math.round(image.beforeBytes / 1024),
      afterKB: Math.round(image.afterBytes / 1024),
      dimensions: `${image.outputWidth}x${image.outputHeight}`,
      action: image.alreadyOptimized
        ? 'already optimized'
        : image.replace
          ? shouldWrite
            ? 'replaced'
            : 'would replace'
          : 'kept',
    })),
  );

  const beforeBytes = generatedFiles.reduce((total, image) => total + image.beforeBytes, 0);
  const afterBytes = generatedFiles.reduce(
    (total, image) => total + (image.replace ? image.afterBytes : image.beforeBytes),
    0,
  );
  const savedPercentage = ((beforeBytes - afterBytes) / beforeBytes) * 100;
  const mode = shouldWrite ? 'Optimized' : 'Dry run';
  console.log(
    `${mode}: ${(beforeBytes / 1024 / 1024).toFixed(2)} MB -> ` +
      `${(afterBytes / 1024 / 1024).toFixed(2)} MB (${savedPercentage.toFixed(1)}% saved).`,
  );
} finally {
  for (const image of generatedFiles) {
    if (image.outputPath) {
      await unlink(image.outputPath).catch(() => undefined);
    }
  }
  await rmdir(temporaryDirectory).catch(() => undefined);
}
