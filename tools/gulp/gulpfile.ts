import {createPackageBuildTasks} from 'material2-build-tools';

// Create gulp tasks to build the different packages in the project.
createPackageBuildTasks('tubular2');
createPackageBuildTasks('tubular2-sample', ['tubular2']);

import './tasks/ci';
import './tasks/clean';
import './tasks/default';
import './tasks/development';
import './tasks/docs';
import './tasks/e2e';
import './tasks/lint';
import './tasks/unit-test';
import './tasks/aot';
import './tasks/tubular-release';
