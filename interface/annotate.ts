export type AnnotatedTextType = 'company' | 'resident' | 'borough' | 'property';
export type AnnotatedTextPart = string | [AnnotatedTextType, string, string];
export type FlatAnnotatedText = string;
