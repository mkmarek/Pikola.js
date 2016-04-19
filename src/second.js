import * as types from './recurrenceTypes'
import * as layerTypes from './recurrenceLayerTypes'

const MIN = 0;
const MAX = 59;

export function validate(layer) {
  if (layer.interval < MIN) throw 'Second interval can\'t be set lower than 1s';
  if (layer.interval > MAX) throw 'Second interval can\'t be set higher than 59s';
  if (isNaN(Number(layer.interval))) throw 'Second interval is not specified';
}

export function getNextExecution(date, layers, next, initialRun = true, forceAdvance = false) {

  //Create a copy so we don't modify the original
  let newDate = new Date(date);
  let secs = date.getSeconds();
  const layer = layers[layerTypes.Second];

  if (layer.type == types.Every) {

    if (initialRun || (
      layers[layerTypes.Minute].interval > 1 || layers[layerTypes.Minute].type != types.Every ||
      layers[layerTypes.Hour].interval > 1 || layers[layerTypes.Hour].type != types.Every ||
      layers[layerTypes.Day].interval > 1 || layers[layerTypes.Day].type != types.Every ||
      layers[layerTypes.Month].interval > 1 || layers[layerTypes.Month].type != types.Every
      ) && secs + layer.interval > MAX)  newDate = next(date, initialRun);

    //Increase by the specified interval
    if (!initialRun || forceAdvance) {
      secs = newDate.getSeconds();
      newDate.setSeconds(secs + (layer.interval || 1));
    }
  } else if (layer.type == types.On) {

    //if the set occurence is somewhere in the past return null
    if (initialRun) newDate = next(date, initialRun);
    else if (secs >= layer.interval) newDate = next(newDate, initialRun, true);

    //set the date to specific occurence
    newDate.setSeconds(layer.interval);
  }

  if (!initialRun && (layers[layerTypes.Millisecond].interval > 1 ||
      layers[layerTypes.Millisecond].type != types.Every))
      newDate.setMilliseconds(0);

  return newDate;
}
