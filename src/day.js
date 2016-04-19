import * as types from './recurrenceTypes'
import * as layerTypes from './recurrenceLayerTypes'

const MIN = 0;

export function validate(layer, isHigherLayerIgnored) {
  if (layer.interval < MIN) throw 'Day interval can\'t be set lower than 0d';
  if (isNaN(Number(layer.interval))) throw 'Day interval is not specified';
}

function getTotalDaysInMonth(date) {
  return new Date(date.getYear(), date.getMonth() + 1, 0).getDate();
}

export function getNextExecution(date, layers, next, initialRun = true) {

  //Create a copy so we don't modify the original
  let newDate = new Date(date);
  let days = date.getDate();
  const layer = layers[layerTypes.Day];


  if (layer.type == types.Every) {

    if (initialRun || (
      layers[layerTypes.Month].interval > 1 || layers[layerTypes.Month].type != types.Every
    ) && days + layer.interval > getTotalDaysInMonth(date)) return next(date, initialRun);

    days = newDate.getDate();

    if (!initialRun) {
      //Increase by the specified interval
      newDate.setDate(days + (layer.interval || 1));
    }
  } else if (layer.type == types.On) {

    //if the set occurence is somewhere in the past return null
    if (initialRun || days >= layer.interval) newDate = next(newDate, initialRun);

    //set the date to specific occurence
    newDate.setDate(layer.interval);
  }

  if (!initialRun && (layers[layerTypes.Hour].interval > 1 ||
      layers[layerTypes.Hour].type != types.Every))
      newDate.setHours(0);

  return newDate;
}
