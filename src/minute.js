import * as types from './recurrenceTypes'
import * as layerTypes from './recurrenceLayerTypes'

const MIN = 0;
const MAX = 59;

export function validate(layer) {
  if (layer.interval < MIN) throw 'Minute interval can\'t be set lower than 1m';
  if (layer.interval > MAX) throw 'Minute interval can\'t be set higher than 59m';
  if (isNaN(Number(layer.interval))) throw 'Minute interval is not specified';
}

export function getNextExecution(date, layers, next, initialRun = true) {

  //Create a copy so we don't modify the original
  let newDate = new Date(date);
  let minutes = newDate.getMinutes();
  const layer = layers[layerTypes.Minute];

  minutes = newDate.getMinutes();

  if (layer.type == types.Every) {

    if (initialRun || (
      layers[layerTypes.Hour].interval > 1 || layers[layerTypes.Hour].type != types.Every ||
      layers[layerTypes.Day].interval > 1 || layers[layerTypes.Day].type != types.Every ||
      layers[layerTypes.Month].interval > 1 || layers[layerTypes.Month].type != types.Every

    ) && minutes + layer.interval > MAX) return next(date, initialRun);

    //Increase by the specified interval
    if (!initialRun) {
      minutes = newDate.getMinutes();
      newDate.setMinutes(minutes + (layer.interval || 1));
    }
  } else if (layer.type == types.On) {

    //if the set occurence is somewhere in the past return null
    if (initialRun || minutes >= layer.interval) newDate = next(newDate, initialRun);

    minutes = newDate.getMinutes();
    //set the date to specific occurence
    newDate.setMinutes(layer.interval);
  }

  //clear all lower sections of the date
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);

  return newDate;
}
