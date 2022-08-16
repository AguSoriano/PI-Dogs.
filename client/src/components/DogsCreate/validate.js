
let noEmpty = /\S+/;
let validateName = /^[a-z]+$/i;


export default function validate(input, allDogs) {
  let errors = {};

  if (!noEmpty.test(input.name) || !validateName.test(input.name)) {
    errors.name = "Only string and without numbers";
  }
  if (input.name.length <= 2) {
    errors.name = "Name should have at 2 letters";
  }
  if (allDogs?.filter(p => input.name === p.name).length !== 0) {
    
    errors.name = "That dogs name already existes"
  }
  if (input.height.length === 2 && (input.height[0] === '' || input.height[1] === '')) {
    errors.height = "height Min or Max is requiere";
  }
  if (input.weight.length === 2 && (input.weight[0] === '' || input.weight[1] === '')) {
    errors.weight = "weight Min or Max is requiere";
  }
  if (input.height.length < 2) {
    errors.height = "height Min or Max is requiere";
  }
  if (input.weight.length < 2) {
    errors.weight = "weight Min or Max is requiere";
  }
  
  if (input.height[1] > 200 || input.height[0] < 0){
    errors.height = "Invalid data"
  }
  if (input.weight[1] > 100 || input.weight[0] < 0){
    errors.weight = "Invalid data"
  }
  if (!input.image) {
    errors.image = "URL required";
  }
  if (!input.temperament.length) {
    errors.temperament = "temperament is required";
  }
  if (input.temperament === null) {
    errors.temperament = "temperament is required";
  }
  if (!input.years_of_life) {
    errors.years_of_life = "years is required";
  }
  if(input.years_of_life > 30 || input.years_of_life < 0){
    errors.years_of_life = "Invalid data";
  }

  return errors;
}