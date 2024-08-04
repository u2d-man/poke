import {Button} from './Button';

export function NewTrainingPokemonButton() {
  return (
    <Button
      label='AddTrainingPokemon'
      customClass='mr-5 text-white'
      onClick={() => {
        window.location.href = '/new-training-pokemon';
      }}
    />
  );
}
