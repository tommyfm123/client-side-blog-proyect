import React from "react";
import "./styles/Contact.css";

export default function ContactPage() {
  return (
    <div className='contact-page'>
      <h2 className='contact-title'>Contacto</h2>
      <form
        className='contact-form'
        action='https://api.web3forms.com/submit'
        method='POST'
      >
        <input type='hidden' name='access_key' value='YOUR_ACCESS_KEY_HERE' />
        <input
          type='hidden'
          name='redirect'
          value='https://mywebsite.com/thanks.html'
        />

        {/* Nombre y Apellido */}
        <div className='contact-flex-column'>
          <label>Nombre y Apellido</label>
          <div className='contact-input-container'>
            <input
              type='text'
              className='contact-input'
              placeholder='Ingrese su Nombre y Apellido'
              name='name'
              required
            />
          </div>
        </div>

        {/* Número de Teléfono */}
        <div className='contact-flex-column'>
          <label>Número de Teléfono</label>
          <div className='contact-input-container'>
            <input
              type='tel'
              className='contact-input'
              placeholder='Ingrese su Número de Teléfono'
              name='phone'
              required
            />
          </div>
        </div>

        {/* Motivo de la Consulta */}
        <div className='contact-flex-column'>
          <label>Motivo de la Consulta</label>
          <div className='contact-input-container'>
            <select className='contact-input' name='reason' required>
              <option value=''>Seleccione un motivo</option>
              <option value='Consulta general'>Consulta general</option>
              <option value='Revisión de salud'>Revisión de salud</option>
              <option value='Síntomas específicos'>Síntomas específicos</option>
              <option value='Consulta de seguimiento'>
                Consulta de seguimiento
              </option>
              <option value='Otros'>Otros</option>
            </select>
          </div>
        </div>

        {/* Área de Texto para Dudas */}
        <div className='contact-flex-column'>
          <label>Duda de la Consulta</label>
          <div className='contact-input-container'>
            <textarea
              className='contact-input'
              placeholder='Escriba su consulta aquí...'
              rows='5'
              name='message'
              required
            ></textarea>
          </div>
        </div>

        {/* Botón de Envío */}
        <button className='contact-button-submit' type='submit'>
          Enviar Consulta
        </button>
      </form>
    </div>
  );
}
