import {
  Chart as ChartJS,
  RadarController,
  LineElement,
  PointElement,
  RadialLinearScale,
} from 'chart.js';
import {Radar} from 'react-chartjs-2';
import {useQuery, type UseQueryResult} from '@tanstack/react-query';
import {css} from '@emotion/react';
import apis, {type ApiResponse} from '../libs/Apis';

ChartJS.register(RadarController, LineElement, PointElement, RadialLinearScale);

type Props = {
  readonly pokedexID: number;
};

export function RadarChart({pokedexID}: Props) {
  const {data}: UseQueryResult<ApiResponse> = useQuery({
    queryKey: ['getPokemonBaseStats'],
    async queryFn() {
      const response = apis.getPokemonBaseStats(pokedexID);
      if (response) {
        return response;
      }

      console.log('fetch error get pokemon base stats.');
    },
  });

  if (!data) return null;

  const chartData = {
    labels: ['HP', 'こうげき', 'ぼうぎょ', 'すばやさ', 'とくぼう', 'とくこう'],
    datasets: [
      {
        label: 'base stats',
        data: data.data,
        backgroundColor: '#fff',
        borderColor: '#fff',
        pointBackgroundColor: '#fff',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#fff',
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 350,
      },
    },
  };

  return (
    <div css={styles.container}>
      <Radar
        data={chartData}
        options={options}
        className="relative h-500 max-w-500 my-0 mx-auto"
      />
    </div>
  );
}

const styles = {
  container: css`
    position: relative;
    width: 100%;
  `,
};
