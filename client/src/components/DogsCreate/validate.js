
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

  if (!input.image) {
    errors.image = "URL required";
  }
  if (!input.temperament.length) {
    errors.temperament = "You must choose at least one type";
  }

  return errors;
}