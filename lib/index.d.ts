import * as React from 'react';
export interface cronProps {
    showResult?: boolean;
    setValue: (e: string) => void;
}
declare const page: React.FC<cronProps>;
export default page;
