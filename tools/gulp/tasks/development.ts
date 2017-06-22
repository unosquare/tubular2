import {task, watch} from 'gulp';
import {tsBuildTask, copyTask, buildAppTask, serverTask} from '../util/task_helpers';
import {join} from 'path';
import {
  buildConfig, copyFiles, buildScssTask, triggerLivereload, sequenceTask
} from 'material2-build-tools';

const {outputDir, packagesDir, projectDir} = buildConfig;

/** Path to the directory where all bundles live. */
const bundlesDir = join(outputDir, 'bundles');

const appDir = join(packagesDir, 'demo-app');
const outDir = join(outputDir, 'packages', 'demo-app');

/** Path to the output of the Material package. */
const materialOutPath = join(outputDir, 'packages', 'material');

/** Array of vendors that are required to serve the demo-app. */
const appVendors = [
  '@angular', 'systemjs', 'zone.js', 'rxjs', 'core-js', 'web-animations-js'
];

/** Glob that matches all required vendors for the demo-app. */
const vendorGlob = `+(${appVendors.join('|')})/**/*.+(html|css|js|map)`;

task(':watch:devapp', () => {
  watch(join(appDir, '**/*.ts'), [':build:devapp:ts', triggerLivereload]);
  watch(join(appDir, '**/*.scss'), [':build:devapp:scss', triggerLivereload]);
  watch(join(appDir, '**/*.html'), [':build:devapp:assets', triggerLivereload]);

  // The themes for the demo-app are built by the demo-app using the SCSS mixins from Material.
  // Therefore when the CSS files have been changed the SCSS mixins have been refreshed and
  // copied over. Rebuilt the theme CSS using the updated SCSS mixins.
  watch(join(materialOutPath, '**/*.css'), [':build:devapp:scss', triggerLivereload]);
});

/** Path to the demo-app tsconfig file. */
const tsconfigPath = join(appDir, 'tsconfig-build.json');

task(':build:devapp:ts', tsBuildTask(tsconfigPath));
task(':build:devapp:scss', buildScssTask(outDir, appDir));
task(':build:devapp:assets', copyTask(appDir, outDir));
task('build:devapp', buildAppTask('devapp'));

task(':serve:devapp', serverTask(outDir, true));

task('serve:devapp', ['build:devapp'], sequenceTask(
  [':serve:devapp', 'tubular2:watch', ':watch:devapp']
));
