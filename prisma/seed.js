import { PrismaClient } from '@prisma/client'
import fs from 'fs'

const uvu_courses = fs.readFileSync('prisma/example_files/uvu_courses.json')

const prismaClient = new PrismaClient()

const issuers = [
  {
    organization: 'freeCodeCamp',
    name: 'Jennifer McBride',
    url: 'https://www.freecodecamp.org/',
    logo: '../../assets/fcc-glyph.jpg',
    title: 'Curriculum Designer',
    types: ['Provider'],
  },
  {
    organization: 'Utah Valley University',
    url: 'https://www.uvu.edu/',
    logo: '../../assets/uvu.png',
    name: 'Jane Smith',
    title: 'Instructional Designer',
    types: ['Provider'],
  },
  {
    organization: 'Neumont College of Computer Science',
    url: 'https://www.neumont.edu/',
    logo: '../../assets/neumont.png',
    name: 'Britta Holt',
    title: 'Director, Career Services',
    types: ['Provider'],
  },
  {
    organization: 'Pluralsight',
    url: 'https://www.pluralsight.com/',
    logo: '../../assets/pluralsight.png',
    name: 'John Smith',
    title: 'Curriculum Designer',
    types: ['Provider'],
  },
  {
    organization: 'Helio Training',
    url: 'https://www.heliotraining.com/',
    logo: '../../assets/helio.png',
    name: 'Sandra Williams',
    title: 'Lead Instructor',
    types: ['Provider'],
  },
  {
    organization: 'Pluralsight',
    url: 'https://www.pluralsight.com/hr/',
    logo: '../../assets/pluralsight.png',
    name: 'Trevor Hansen',
    title: 'Talent Acquisition',
    types: ['Employer'],
  },
  {
    organization: 'Adobe',
    url: 'https://www.adobe.com/',
    logo: '../../assets/adobe.png',
    name: 'Sandra Adams',
    title: 'Engineering Hiring Manager',
    types: ['Employer'],
  },
  {
    organization: 'Ebay',
    url: 'https://www.ebay.com/',
    logo: '../../assets/ebay.png',
    name: 'Ali Connors',
    title: 'Lead Recruiter',
    types: ['Employer'],
  },
]

async function createIssuers() {
  const  mappedIssuers = issuers.map(i => {
    return {
      data: {
        organization: i.organization,
        name: i.name,
        url: i.url,
        logo: i.logo,
        title: i.title,
        types: {
          set: i.types
        }
      }
    }
  })
  for (let mpdIssuer of mappedIssuers) {
  await prismaClient.person
    .create(mpdIssuer)
    .catch(err =>
      console.log(
        `Error.  Probably trying to create a new issuer when one already exists with their unique URL. ${err}`,
      ),
    )
      }
}

function loadUVUCourses() {
  const catalog = JSON.parse(uvu_courses)
  const allCourses = catalog.comet.course
  const dgmCourses = allCourses.filter(
    course =>
      course.prefix._text === 'DGM' ||
      course.prefix._text === 'CS' ||
      course.prefix._text == 'IT' ||
      course.prefix_text === 'INFO',
  )
  return allCourses.map(crs => {
    return {
      data: {
        type: 'Course',
        name: crs.title._text,
        description: crs.description._text,
        defaultCredits: crs.totalCredits._text,
        courseCode: `${crs.prefix._text} ${crs.number._text}`,
        associatedPersonnel: {
          connect: {
            url: 'https://www.uvu.edu/',
          },
        },
        termsOffered: crs.termsOffered._text,
        additionalProperties: JSON.stringify({
          prefix: crs.prefix._text,
          subject: crs.subject._text,
          prereq: crs.prereq._text,
          coreq: crs.coreq._text,
        }),
      },
    }
  })
}

async function main() {
  await createIssuers()
  const allCourses = loadUVUCourses()
  for (let crs of allCourses) {
    await prismaClient.course
      .create(crs)
      .catch(err => console.log(`Error trying to create UVU courses: ${err}`))
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => {
    await prismaClient.disconnect()
  })
