import zod from "zod"

export const todoCreateSchema = zod.object({
    key: zod.string(),
    title: zod.string(),
    description: zod.string(),
    completed:zod.boolean()
})

export const todoUpdateSchema = zod.object({
  _id: zod.string()
})
