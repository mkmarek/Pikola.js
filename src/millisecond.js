import * as types from './recurrenceTypes'
import * as layerTypes from './recurrenceLayerTypes'

const MIN = 0;
const MAX = 999;

export function validate(layer) {
  if (layer.interval < MIN) throw 'Millisecond interval can\'t be set lower than 1ms';
  if (layer.interval > MAX) throw 'Millisecond interval can\'t be set higher than 999ms';
  if (isNaN(Number(layer.interval))) throw 'Millisecond interval is not specified';
}

export function getNextExecution(date, layers, next, initialRun = true, forceAdvance = false) {

  //Create a copy so we don't modify the original
  let newDate = new Date(date);
  let mills = date.getMilliseconds();
  const layer = layers[layerTypes.Millisecond];

  if (layer.type == types.Every) {

    if (initialRun || (
      layers[layerTypes.Second].interval > 1 || layers[layerTypes.Second].type != types.Every ||
      layers[layerTypes.Minute].interval > 1 || layers[layerTypes.Minute].type != types.Every ||
      layers[layerTypes.Hour].interval > 1 || layers[layerTypes.Hour].type != types.Every ||
      layers[layerTypes.Day].interval > 1 || layers[layerTypes.Day].type != types.Every ||
      layers[layerTypes.Month].interval > 1 || layers[layerTypes.Month].type != types.Every
    ) && mills + layer.interval > MAX)  newDate = next(date, initialRun);

    //Increase by the specified interval
    if (!initialRun || forceAdvance) {
      mills = date.getMilliseconds();
      newDate.setMilliseconds(mills + (layer.interval || 1));
    }
  } else if (layer.type == types.On) {

    //if the set occurence is somewhere in the past return null
    if (initialRun) newDate = next(date, initialRun);
    else if (mills >= layer.interval) newDate = next(date, initialRun, true);

    //set the date to specific occurence
    newDate.setMilliseconds(layer.interval);
  }

  return newDate;
}
