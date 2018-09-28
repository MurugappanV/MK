/**
 * Scale % to full device respective width and height
 * Scale SampleDesign width/height to device respective width and height
 * Author : Murugappan V
 * Date   : 9 Sep 2018
 * @flow
 */
 import { Metrics } from "./Metrics";

const designSampleTotalWidth = 455
const designSampleTotalHeight = 810

export const ScalePerctFullHeight = (height) => {
    return Metrics.FULL_DEVICE_HEIGHT * height / 100
}

export const ScalePerctFullWidth = (width) => {
    return Metrics.FULL_DEVICE_WIDTH * width / 100
}

export const ScaleSampDesgHeight = (height) => {
    return Metrics.FULL_DEVICE_HEIGHT * height / designSampleTotalHeight
}

export const ScaleSampDesgWidth = (width) => {
    return Metrics.FULL_DEVICE_WIDTH * width / designSampleTotalWidth
}