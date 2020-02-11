import { idArg, queryType, stringArg } from 'nexus'

export const Query = queryType({
  definition(t) {
    t.field('Course', {
      type: 'Course',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.photon.course.findOne({
          where: {
            id,
          },
        })
      },
    })

    t.list.field('Courses', {
      type: 'Course',
      resolve: (parent, args, ctx) => {
        return ctx.photon.course.findMany()
      },
    })

    t.list.field('filterCourses', {
      type: 'Course',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (_, { searchString }, ctx) => {
        return ctx.photon.course.findMany({
          where: {
            OR: [
              { name: { contains: searchString } },
              { description: { contains: searchString } },
            ],
          },
        })
      },
    })

    t.field('Competency', {
      type: 'Competency',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        return ctx.photon.competency.findOne({
          where: {
            id,
          },
        })
      },
    })

    t.list.field('Competencies', {
      type: 'Competency',
      resolve: (parent, args, ctx) => {
        return ctx.photon.competency.findMany()
      },
    })

    t.list.field('filterCompetencies', {
      type: 'Competency',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (_, { searchString }, ctx) => {
        return ctx.photon.competency.findMany({
          where: {
            OR: [
              { name: { contains: searchString } },
              { description: { contains: searchString } },
            ],
          },
        })
      },
    })
  },
})
