import joi from 'joi';

export const postValidator = (post) => {
    const postValidatorSchema = joi.object({
        post_title: joi.string().required(),
        post_content: joi.string().required(),
        author_id: joi.number().required()
    });
    return postValidatorSchema.validate(post);
}
