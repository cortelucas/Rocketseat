import { expect, test } from 'vitest'
import { getFutureDate } from '../../tests/utils/get-future-date'
import { Appointment } from './appointment'

test('Create an appointment', () => {
  const startsAt = new Date()
  const endsAt = new Date()

  startsAt.setDate(startsAt.getDate() + 1)
  endsAt.setDate(endsAt.getDate() + 2)

  const appointment = new Appointment({
    customer: 'John Doe',
    startsAt,
    endsAt
  })

  expect(appointment).toBeInstanceOf(Appointment)
  expect(appointment.customer).toEqual('John Doe')
})

test('Cannot create an appointment with en date before start date', () => {
  const startsAt = getFutureDate('2022-08-10')
  const endsAt = getFutureDate('2022-08-09')

  expect(() => {
    return new Appointment({
      customer: 'John Doe',
      startsAt,
      endsAt
    })
  }).toThrow()
})

test('Cannot create an appointment with end date before now', () => {
  const startsAt = new Date()
  const endsAt = new Date()

  startsAt.setDate(startsAt.getDate() + 2)
  endsAt.setDate(endsAt.getDate() + 1)

  expect(() => {
    return new Appointment({
      customer: 'John Doe',
      startsAt,
      endsAt
    })
  }).toThrow()
})
