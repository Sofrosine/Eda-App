import * as React from 'react';
import {FormikProps, FormikState} from 'formik';
import debounce from 'lodash.debounce';
import isEqual from 'react-fast-compare';

// Copied from https://usehooks.com/usePrevious/
// License is Unlicensed, https://github.com/gragland/usehooks/blob/master/LICENSE
function usePrevious<T>(value: T): T | undefined {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = React.useRef();

  // Store current value in ref
  React.useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

export function PersistCustom(
  formik: FormikProps<any>,
  name: string,
  debounceDelay = 300,
  isSessionStorage = false,
) {
  const saveForm = React.useMemo(
    () =>
      debounce((data: FormikState<{}>) => {
        if (isSessionStorage) {
          window.sessionStorage.setItem(name, JSON.stringify(data));
        } else {
          window.localStorage.setItem(name, JSON.stringify(data));
        }
      }, debounceDelay),
    [debounceDelay, isSessionStorage, name],
  );

  React.useEffect(() => {
    const maybeState = isSessionStorage
      ? window.sessionStorage.getItem(name)
      : window.localStorage.getItem(name);
    if (maybeState) {
      formik.setValues(JSON.parse(maybeState));
      console.log('set state', maybeState);
    }
  }, []); // deps must be empty, effect will run only on mount

  const previousValues = usePrevious(formik.values);
  React.useEffect(() => {
    if (previousValues && !isEqual(previousValues, formik.values)) {
      saveForm(formik.values);
    }
  }, [formik.values, previousValues, saveForm]);
}
