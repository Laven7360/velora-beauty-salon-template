import { useEffect, useRef, useReducer } from 'react'
import { Link } from 'react-router-dom'
import { bookingSteps, createBookingFlow, bookingReducer } from '../../data/booking'
import { ServiceStep, HairStep, ArtistStep, DateStep, ContactStep } from './BookingFields'
import { BookingReview, BookingSummary } from './BookingReview'
const headings = ['What are you coming in for?', 'Tell us about your hair.', 'Do you have a preferred artist?', 'When would suit you?', 'How would we reach you?', 'Your request, at a glance.']
const stepComponents = [ServiceStep, HairStep, ArtistStep, DateStep, ContactStep]
export function BookingCompletion({ data, onReset, headingRef }) {
  return <section className="enquiry-complete" aria-labelledby="enquiry-complete-title"><p className="utility" role="status">Demo finished · Nothing sent</p><h2 ref={headingRef} tabIndex={-1} id="enquiry-complete-title">Demo request complete.</h2><p className="enquiry-copy">This portfolio demo does not send or save appointment information. The summary below exists only in this page’s memory; leaving or refreshing clears the form. No appointment has been made.</p><BookingReview data={data} /><div className="enquiry-complete-actions"><button type="button" className="booking-link" onClick={onReset}>Start Another Demo ↗</button><Link className="text-link" to="/">Return Home ↗</Link><Link className="text-link" to="/services">Explore Services ↗</Link></div></section>
}
export default function BookingFlow({ search, navigationState, onReset }) {
  const [{ data, step, errors, complete }, dispatch] = useReducer(bookingReducer, { search, navigationState }, createBookingFlow)
  const heading = useRef(null), form = useRef(null), initialRender = useRef(true)
  const errorFocusRequested = useRef(false)
  useEffect(() => {
    if (initialRender.current) { initialRender.current = false; return }
    heading.current?.focus()
  }, [step,complete])
  useEffect(() => {
    if (errorFocusRequested.current && Object.keys(errors).length) form.current?.querySelector('[aria-invalid="true"]')?.focus()
    errorFocusRequested.current = false
  }, [errors])
  function update(field,value) {
    dispatch({ type: 'update', field, value })
  }
  function goTo(next) { dispatch({ type: 'edit', step: next }) }
  function advance(event) {
    event.preventDefault()
    errorFocusRequested.current = true
    dispatch({ type: 'next' })
  }
  if (complete) return <BookingCompletion data={data} onReset={onReset} headingRef={heading} />
  const StepComponent = stepComponents[step]
  return <><ol className="enquiry-progress" aria-label="Appointment enquiry progress">{bookingSteps.map((label,index) => <li key={label} aria-current={step === index ? 'step' : undefined} className={index < step ? 'is-complete' : ''}><span>{String(index + 1).padStart(2,'0')}</span>{label}{index < step && <span className="progress-done"> ✓</span>}</li>)}</ol>
    <div className="enquiry-layout"><form ref={form} noValidate autoComplete="off" onSubmit={advance} className="enquiry-form"><p className="utility" role="status" aria-live="polite">Step {step + 1} of 6 · {bookingSteps[step]}</p><h2 ref={heading} tabIndex={-1}>{headings[step]}</h2>
      {Object.keys(errors).length > 0 && <p role="alert" className="enquiry-error-summary">Please check the highlighted fields before continuing.</p>}
      <div className="enquiry-step" key={step}>{step === 5 ? <><p className="enquiry-help">Check your demo choices. You can edit any section before previewing the request.</p><BookingReview data={data} onEdit={goTo} /></> : <StepComponent data={data} update={update} errors={errors} />}</div>
      <div className="enquiry-navigation">{step > 0 && <button type="button" className="enquiry-back" onClick={() => goTo(step-1)}>← Back</button>}<button type="submit" className="booking-link">{step === 5 ? 'Preview Appointment Request' : 'Continue'} <span aria-hidden="true">↗</span></button></div>
      <p className="enquiry-note">Portfolio demo · Nothing is submitted. Refreshing resets the form.</p>
    </form><BookingSummary data={data} /></div></>
}
