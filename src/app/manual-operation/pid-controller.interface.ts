import {PidControllerConfig} from './pid-controller-config.interface';
import {PidControllerData} from './pid-controller-data.interface';

export interface PidController {
    name: string;
    config: PidControllerConfig
    data: PidControllerData,
    newConfig: PidControllerConfig
}
