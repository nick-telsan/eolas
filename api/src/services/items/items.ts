import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { db } from 'src/lib/db'

export const items: QueryResolvers['items'] = () => {
  return db.item.findMany({
    orderBy: {
      id: 'asc',
    },
  })
}

export const item: QueryResolvers['item'] = ({ id }) => {
  if (id) {
    return db.item.findUnique({
      where: { id },
      include: {
        parent: true,
      },
    })
  }

  return
}

export const itemsByName: QueryResolvers['itemsByName'] = ({ name }) => {
  return db.item.findMany({
    where: {
      name: {
        contains: name,
      },
    },
  })
}

export const createItem: MutationResolvers['createItem'] = ({ input }) => {
  return db.item.create({
    data: input,
  })
}

export const updateItem: MutationResolvers['updateItem'] = ({ input }) => {
  return db.item.update({
    data: input,
    where: { id: input.id },
  })
}

export const createOrUpdateItem: MutationResolvers['createOrUpdateItem'] = ({
  input,
}) => {
  if (input.id) {
    return db.item.update({
      data: input,
      where: { id: input.id },
    })
  }

  return db.item.create({
    data: input,
  })
}

export const deleteItem: MutationResolvers['deleteItem'] = ({ id }) => {
  return db.item.delete({
    where: { id },
  })
}
