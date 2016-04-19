import * as types from './recurrenceTypes'
import * as layerTypes from './recurrenceLayerTypes'

const MIN = 0;

export function validate(layer, isHigherLayerIgnored) {
  if (layer.interval < MIN) throw 'Month interval can\'t be set lower than 0d';
  if (isNaN(Number(layer.interval))) throw 'Month interval is not specified';
}

export function getNextExecution(date, layers, next, initialRun = true) {

  //Create a copy so we don't modify the original
  const newDate = new Date(date);
  const months = date.getMonth();
  const layer = layers[layerTypes.Month];

  if (layer.type == types.Every) {

    //Increase by the specified interval
    if (!initialRun) {
      newDate.setMonth(months + (layer.interval || 1));
    }
  } else {

    throw 'Invalid occurence type for Month layer';
  }

  //clear all lower sections of the date
  newDate.setDate(1);
  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);

  return newDate;
}
