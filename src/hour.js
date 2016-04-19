import * as types from './recurrenceTypes'
import * as layerTypes from './recurrenceLayerTypes'

const MIN = 0;
const MAX = 23;

export function validate(layer) {
  if (layer.interval < MIN) throw 'Hour interval can\'t be set lower than 1h';
  if (layer.interval > MAX) throw 'Hour interval can\'t be set higher than 23h';
  if (isNaN(Number(layer.interval))) throw 'Hour interval is not specified';
}

export function getNextExecution(date, layers, next, initialRun = true) {


  //Create a copy so we don't modify the original
  let hours = date.getHours();
  let newDate = new Date(date);
  const layer = layers[layerTypes.Hour];

  if (layer.type == types.Every) {

    if (initialRun || (
      layers[layerTypes.Day].interval > 1 || layers[layerTypes.Day].type != types.Every ||
      layers[layerTypes.Month].interval > 1 || layers[layerTypes.Month].type != types.Every
    ) && hours + layer.interval > MAX) return next(date, initialRun);

    //Increase by the specified interval
    if (!initialRun) {
      hours = newDate.getHours();
      newDate.setHours(hours + (layer.interval || 1));
    }
  } else if (layer.type == types.On) {

    //if the set occurence is somewhere in the past return null
    if (initialRun || hours >= layer.interval) newDate = next(newDate, initialRun);

    //set the date to specific occurence
    newDate.setHours(layer.interval);
  }

  //clear all lower sections of the date
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);

  return newDate;
}
