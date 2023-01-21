import useMeasure from 'react-use-measure';
import { AnimatePresence, motion } from 'framer-motion';
import type { ReactNode } from 'react';

export const ResizablePanel = ({ children }: { children: ReactNode }) => {
    const [ref, { height }] = useMeasure();

    return (
        <motion.div
            animate={{ height: height || 'auto' }}
            className={'relative overflow-hidden w-full'}>
            <AnimatePresence>
                <motion.div
                    key={JSON.stringify(children, ignoreCircularReferences())}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}>
                    <div ref={ref} className={`${height ? 'absolute' : 'relative'} w-full`}>
                        {children}
                    </div>
                </motion.div>
            </AnimatePresence>
        </motion.div>
    );
};

const ignoreCircularReferences = () => {
    const seen = new WeakSet();
    return (key: any, value: any) => {
        if (key.startsWith('_')) return;
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) return;
            seen.add(value);
        }
        return value;
    };
};
