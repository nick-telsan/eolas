import type { QueryResolvers, MutationResolvers } from 'types/graphql'

import { UserInputError } from '@redwoodjs/graphql-server'

import { db } from 'src/lib/db'

async function canAddParent(id: number | undefined) {
  if (id) {
    const potentialParent = await db.item.findUnique({
      where: {
        id,
      },
      include: {
        parent: {
          include: {
            parent: {
              include: {
                parent: true,
              },
            },
          },
        },
      },
    })

    if (potentialParent?.parent?.parent?.parent) {
      return false
    }
  }
  return true
}

export const items: QueryResolvers['items'] = () => {
  return db.item.findMany({
    where: {
      parentId: null,
    },
    orderBy: {
      position: 'asc',
    },
    include: {
      children: {
        orderBy: {
          position: 'asc',
        },
        include: {
          children: {
            orderBy: {
              position: 'asc',
            },
            include: {
              children: {
                orderBy: {
                  position: 'asc',
                },
              },
            },
          },
        },
      },
    },
  })
}

export const itemsSearch: QueryResolvers['itemsSearch'] = async ({
  search,
}) => {
  return db.item.findMany({
    where: {
      OR: [
        {
          name: {
            contains: search,
          },
        },
        {
          body: {
            contains: search,
          },
        },
        {
          philosophy: {
            contains: search,
          },
        },
      ],
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

export const itemsByName: QueryResolvers['itemsByName'] = ({ name, id }) => {
  return db.item.findMany({
    where: {
      name: {
        contains: name,
      },
      id: {
        not: id,
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

export const createOrUpdateItem: MutationResolvers['createOrUpdateItem'] =
  async ({ input }) => {
    const parentOkay = await canAddParent(input.parentId)

    if (parentOkay) {
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

    throw new UserInputError('Child cannot be more than 4 levels deep.')
  }

export const deleteItem: MutationResolvers['deleteItem'] = ({ id }) => {
  return db.item.delete({
    where: { id },
  })
}
