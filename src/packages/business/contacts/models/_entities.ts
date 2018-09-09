import PersonSchema from './person.json'
import CompanySchema from './company.json'
import ContactEventSchema from './contact-event.json'

export const ContactsEntities = [{
  name: 'persons',
  schema: PersonSchema,
  sync: true
}, {
  name: 'companies',
  schema: CompanySchema,
  sync: true
}, {
  name: 'contactEvents',
  schema: ContactEventSchema,
  sync: true
}]