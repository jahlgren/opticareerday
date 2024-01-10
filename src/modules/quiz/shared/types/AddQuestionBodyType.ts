import * as yup from 'yup';

type AddQuestionBodyType = {
  sv: string,
  fi: string
}

export const addQuestionBodySchema = yup.object().shape({
  sv: yup.string().required(),
  fi: yup.string().required()
});

export default AddQuestionBodyType;