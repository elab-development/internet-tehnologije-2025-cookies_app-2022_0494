import * as yup from "yup";

const contactSchema = yup.object({
  email: yup.string().email("Neispravan format emaila").required("Email je obavezan"),
  name: yup.string().required("Ime je obavezno"),
  message: yup.string().required("Poruka je obavezna"),
});

export default contactSchema;
