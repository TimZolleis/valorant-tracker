import { DateTime } from 'luxon';
import { Area, AreaChart, CartesianGrid, LineChart, XAxis, YAxis } from 'recharts';

type MatchData = {
    matchDate: DateTime;
    rr: number;
};

const PlayerRRGraphComponent = ({
    width,
    height,
    data,
}: {
    width: number;
    height: number;
    data: MatchData[];
}) => {
    return (
        <div>
            <AreaChart
                data={data}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                width={width}
                height={height}>
                <defs>
                    <linearGradient id='colorRR' x1='0' y1='0' x2='0' y2='1'>
                        <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                        <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
                    </linearGradient>
                </defs>
                <XAxis dataKey='matchDate' />
                <YAxis />
                <CartesianGrid strokeDasharray='3 3' />
                <Area
                    type='monotone'
                    dataKey='rr'
                    stroke='#8884d8'
                    fillOpacity={1}
                    fill='url(#colorUv)'
                />
            </AreaChart>
        </div>
    );
};

export default PlayerRRGraphComponent;
