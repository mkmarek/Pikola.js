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

  if (!initialRun && (layers[layerTypes.Day].interval > 1 ||
      layers[layerTypes.Day].type != types.Every))
      newDate.setDate(1);

  return newDate;
}
