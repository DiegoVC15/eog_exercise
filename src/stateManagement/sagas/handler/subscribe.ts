import api from '../../../dataAPI/api';
import { setSubscription, unSubscription, setActual } from '../../features/temps/temps';
import store from '../../store/store';

interface Measurement {
  metric: string,
  at: Date,
  value: number,
  unit: string,
}
export default function handleSubscribe(subs:number,
  subscription:ZenObservable.Subscription | null) {
  if (subscription && subs === 0) {
    subscription.unsubscribe();
    store.dispatch(unSubscription());
  } else if (!subscription && subs > 0) {
    const observable = api.subscribeToMetrics(
      (current:Measurement) => store.dispatch(setActual(current)),
    );
    store.dispatch(setSubscription(observable));
  }
}
