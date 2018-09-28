/**
 * Metrics of device and default values  
 * Author : Murugappan V
 * Date   : 9 Sep 2018
 * @flow
 */
import { Dimensions } from 'react-native';

// device sizes
const FULL_DEVICE_HEIGHT = Dimensions.get('window').height;
const FULL_DEVICE_WIDTH = Dimensions.get('window').width;

//text sizes
const MEDIUM_TEXT_SIZE = 16
const LARGE_TEXT_SIZE = 22
const EXTRA_LARGE_TEXT_SIZE = 30

//border radius
const SMOOTH_CORNER = 3
const SMALL_RADIUS = 5
const MEDIUM_RADIUS = 10
const LARGE_RADIUS = 20

export const Metrics = {
    FULL_DEVICE_HEIGHT,
    FULL_DEVICE_WIDTH,

    MEDIUM_TEXT_SIZE,
    LARGE_TEXT_SIZE,
    EXTRA_LARGE_TEXT_SIZE,

    SMOOTH_CORNER,
    SMALL_RADIUS,
    MEDIUM_RADIUS,
    LARGE_RADIUS
}