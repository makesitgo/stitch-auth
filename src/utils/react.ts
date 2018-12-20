import { ComponentType, ReactNode } from 'react';

export const getComponentName = (component: ComponentType<any>) =>
  component.displayName || (component as any).name;

export const getHocComponentName = (hocName: string, component: ComponentType<any>) =>
  `${hocName}(${getComponentName(component)})`;

type HasRenderProp<T> = T extends { render: (props: any) => ReactNode } ? T : never;

type HasChildrenProp<T> = T extends { children: (props: any) => ReactNode } ? T : never;

type IsFunction<T> = T extends (...args: any[]) => any ? T : never;

const isFunction = <T extends {}>(value: T): value is IsFunction<T> => typeof value === 'function';

export const hasRenderFunc = <T extends {}>(value: T): value is HasRenderProp<T> =>
  'render' in value && isFunction((value as HasRenderProp<T>).render);

export const hasChildrenFunc = <T extends {}>(value: T): value is HasChildrenProp<T> =>
  'children' in value && isFunction((value as HasChildrenProp<T>).children);
