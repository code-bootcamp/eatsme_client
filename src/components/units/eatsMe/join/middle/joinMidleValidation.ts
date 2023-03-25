import * as yup from "yup";

export const schema = yup.object({
  email: yup
    .string()
    .email("이메일 형식이 아닙니다.")
    .required("이메일은 필수입니다."),

  nickname: yup
    .string()
    .max(8, "8글자 이내로 적어주세요")
    .required("별칭을 입력해주세요."),
  password: yup
    .string()
    .min(8, "8자리 이상 입력해주세요.")
    .max(16, "16자리 이내로 입력해주세요.")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}[^\s]*$/,
      "영문+숫자 조합 8~16자리의 비밀번호를 입력해주세요."
    )
    .required("비밀번호를 입력해주세요."),

  passwordCheck: yup
    .string()
    .min(8, "8자리 이상 입력해주세요.")
    .max(16, "16자리 이내로 입력해주세요.")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,16}[^\s]*$/,
      "영문+숫자 조합 8~16자리의 비밀번호를 입력해주세요."
    )
    .required("비밀번호를 입력해주세요."),
});