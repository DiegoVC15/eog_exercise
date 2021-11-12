import api from '../../../dataAPI/api';
import { Measurement } from '../../../interfaces/interfaces';
import {
  setSubscription,
  unSubscription,
  setActual,
  updateChart,
} from '../../features/temps/temps';
import store from '../../store/store';

export default function handleSubscribe(subs:number,
  subscription:ZenObservable.Subscription | null) {
  if (subscription && subs === 0) {
    subscription.unsubscribe();
    store.dispatch(unSubscription());
  } else if (!subscription && subs > 0) {
    const observable = api.subscribeToMetrics(
      (current:Measurement) => {
        store.dispatch(setActual(current));
        store.dispatch(updateChart(current));
      },
    );
    store.dispatch(setSubscription(observable));
  }
}
