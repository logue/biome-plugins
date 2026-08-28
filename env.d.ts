declare module '*.scss';

import type { HTMLAttributes } from 'react';

type CarbonWebComponentProps = HTMLAttributes<HTMLElement> & {
  [attribute: string]: unknown;
};

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      [tagName: `cds-${string}`]: CarbonWebComponentProps;
    }
  }
}
