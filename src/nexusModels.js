import { objectType, enumType } from 'nexus'

const Association = objectType({
  name: 'Association',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.type()
    t.model.associationType()
    t.model.entityType()
    t.model.entityId()
    t.model.additionalProperties()
  },
})

const Certificate = objectType({
  name: 'Certificate',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.type()
    t.model.name()
    t.model.description()
    t.model.defaultCredits()
    t.model.defaultPoints()
    t.model.sourcedId()
    t.model.alternativeLabel()
    t.model.additionalProperties()
    t.model.level()
    t.model.areaOfStudy()
    t.model.associatedPersonnel()
    t.model.associations()
  },
})

const Competency = objectType({
  name: 'Competency',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.type()
    t.model.name()
    t.model.description()
    t.model.defaultCredits()
    t.model.defaultPoints()
    t.model.sourcedId()
    t.model.associations()
    t.model.courses()
    t.model.alternativeLabel()
    t.model.additionalProperties()
    t.model.humanCodingScheme()
    t.model.CFDocumentURI()
    t.model.bloomCategory()
    t.model.resources()
    t.model.tags()
    t.model.associatedPersonnel()
  },
})

const Course = objectType({
  name: 'Course',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.type()
    t.model.name()
    t.model.description()
    t.model.defaultCredits()
    t.model.defaultPoints()
    t.model.sourcedId()
    t.model.associations()
    t.model.alternativeLabel()
    t.model.additionalProperties()
    t.model.courseCode()
    t.model.startDate()
    t.model.endDate()
    t.model.associatedPersonnel()
    t.model.termsOffered()
  },
})

const Person = objectType({
  name: 'Person',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.types()
    t.model.name()
    t.model.organization()
    t.model.url()
    t.model.address()
    t.model.email()
    t.model.phone()
    t.model.logo()
    t.model.title()
    t.model.associatedCourses()
    t.model.additionalProperties()
  },
})

const Resource = objectType({
  name: 'Resource',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.description()
    t.model.url()
    t.model.videoURL()
    t.model.tags()
    t.model.associatedPersonnel()
    t.model.tests()
  },
})

const Tag = objectType({
  name: 'Tag',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.associatedPersonnel()
    t.model.name()
    t.model.competencies()
    t.model.description()
  },
})

const UnitTest = objectType({
  name: 'UnitTest',
  definition(t) {
    t.model.id()
    t.model.createdAt()
    t.model.updatedAt()
    t.model.title()
    t.model.text()
    t.model.testString()
  },
})

const AssociationType = enumType({
  name: 'AssociationType',
  description:
    'Indicates the nature of association between instructional entities.',
  members: [
    'ExactMatchOf',
    'Precedes',
    'IsChildOf',
    'IsParentOf',
    'HasSkillLevel',
    'ReplacedBy',
    'IsPartOf',
    'Exemplar',
    'IsRelatedTo',
    'IsPeerOf',
  ],
})

const EntityType = enumType({
  name: 'EntityType',
  description: 'Indicates the type of the instructional entity.',
  members: [
    'Basic',
    'Competency',
    'Course',
    'Degree',
    'Certificate',
    'Assessment',
    'CoCurricular',
  ],
})

const BloomLevel = enumType({
  name: 'BloomLevel',
  description:
    'Indicates instructional level of the entity based on Blooms Taxonomy(revised)',
  members: [
    'CREATE',
    'EVALUATE',
    'ANALYZE',
    'APPLY',
    'UNDERSTAND',
    'REMEMBER',
    'INFO',
  ],
})

const PersonType = enumType({
  name: 'PersonType',
  description: 'Indicates type of the Person or Organization',
  members: [
    'Faculty',
    'Instructor',
    'TeachingAssistant',
    'AdjunctFaculty',
    'CourseMentor',
    'Teacher',
    'Evaluator',
    'Issuer',
    'Owner',
    'Representative',
    'Provider',
    'Employer',
    'Endorser',
  ],
})

export const Models = [
  Association,
  Certificate,
  Competency,
  Course,
  Person,
  Resource,
  Tag,
  UnitTest,
  AssociationType,
  EntityType,
  BloomLevel,
  PersonType,
]
