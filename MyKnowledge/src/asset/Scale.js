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
const gFullHeight = Metrics.FULL_DEVICE_HEIGHT
const gFullWidth = Metrics.FULL_DEVICE_WIDTH

export const ScalePerctFullHeight = (height: number) => {
    return gFullHeight * height / 100
}

export const ScalePerctFullWidth = (width: number) => {
    return gFullWidth * width / 100
}

export const ScaleSampDesgHeight = (height: number) => {
    return gFullHeight * height / designSampleTotalHeight
}

export const ScaleSampDesgWidth = (width: number) => {
    return gFullWidth * width / designSampleTotalWidth
}

export const ScaleMinSampleDesg = (height: number, width: number) => {
    if(gFullHeight > gFullWidth) {
        return ScaleSampDesgWidth(width)
    } else {
        return ScaleSampDesgHeight(height)
    }
}