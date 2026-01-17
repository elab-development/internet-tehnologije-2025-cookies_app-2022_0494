import * as yup from "yup"

const loginSchema = yup.object({
    email: yup.string("Neispravan format").email("Neispravan format emaila").required("Email je obavezan"),
    password: yup.string("Neispravan format").required("Lozinka je obavezna")
  });


  export default loginSchema;