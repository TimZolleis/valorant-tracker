import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from 'recharts';

export type GraphOptions = {
    width: number;
    height: number;
    data: any;
    margin?: MarginOptions;
    graphDataKey: string;
    grid?: boolean;
    xAxis?: boolean;
    xAxisDataKey: string;
    xAxisTick?: any;
    yAxisTick?: any;
};

export type MarginOptions = {
    top: number;
    right: number;
    left: number;
    bottom: number;
};

export const WhiteAreaGraph = ({
    width,
    height,
    data,
    margin,
    graphDataKey,
    xAxisDataKey,
    grid = false,
    xAxis = false,
    xAxisTick,
    yAxisTick,
}: GraphOptions) => {
    return (
        <ResponsiveContainer height={height}>
            <AreaChart data={data}>
                <defs>
                    <linearGradient id='colorRR' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor='#9ca3af' stopOpacity={0.5} />
                        <stop offset='95%' stopColor='#9ca3af' stopOpacity={0} />
                    </linearGradient>
                </defs>
                {xAxis && <XAxis className={'text-white'} dataKey={xAxisDataKey} />}
                <YAxis width={30} domain={['dataMin', 'dataMax']} />
                {grid && <CartesianGrid className={'opacity-50'} strokeDasharray='2 2' />}
                <Area
                    type='basis'
                    strokeWidth={3}
                    dataKey={graphDataKey}
                    stroke='#ffffff'
                    fillOpacity={1}
                    fill='url(#colorRR)'
                />
            </AreaChart>
        </ResponsiveContainer>
    );
};
