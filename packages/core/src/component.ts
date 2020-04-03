import { connect4C } from '@de2/relation';
import { Store } from '@de2/store';
import { IComponentInstance, TComponentOption } from './interface';
import { connectProps2MapProps } from './utils';

declare function Component(options: TComponentOption<any, any, any, any, any, any, any, any>): void;

export function component<
  Props,
  Data,
  Method extends Record<string, (...args: any[]) => void>,
  S extends Store<any, any, any, any>,
  SS extends S['state'],
  SG extends S['getters'],
  SA extends S['actions'],
  SM extends S['mutations']
>(option: TComponentOption<Props, Data, Method, S, SS, SG, SA, SM> & ThisType<IComponentInstance<Props, Data, S, SS>>) {
  const { $store, connector } = option;

  const isStore = $store && $store.dispatch !== undefined;
  const args: any[] = [connectProps2MapProps(connector)];
  if (isStore) {
    option.$store = $store;
    args.unshift($store);
  }

  const opts = connect4C.apply(null, args)(option);

  return Component(opts);
}
