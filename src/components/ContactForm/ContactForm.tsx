import styles from "./ContactForm.module.css";

export function ContactForm() {
  return (
    <form className={styles.form} method="post" action="#" aria-label="Formulário de contato para orçamento">
      <div className={styles.field}>
        <label htmlFor="name">Nome</label>
        <input id="name" name="name" type="text" autoComplete="name" required />
      </div>

      <div className={styles.twoCols}>
        <div className={styles.field}>
          <label htmlFor="email">E-mail</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>

        <div className={styles.field}>
          <label htmlFor="phone">Telefone ou WhatsApp</label>
          <input id="phone" name="phone" type="tel" autoComplete="tel" required />
        </div>
      </div>

      <div className={styles.field}>
        <label htmlFor="style">Estilo desejado</label>
        <select id="style" name="style" defaultValue="" required>
          <option value="" disabled>
            Selecione um estilo
          </option>
          <option value="Fine line">Fine line</option>
          <option value="Blackwork">Blackwork</option>
          <option value="Floral">Floral</option>
          <option value="Anime">Anime</option>
          <option value="Ornamental">Ornamental</option>
          <option value="Lettering">Lettering</option>
          <option value="Projeto grande">Projeto grande</option>
          <option value="Cover-up">Cover-up</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="message">Mensagem</label>
        <textarea id="message" name="message" rows={5} placeholder="Conte sua ideia, tamanho aproximado e região do corpo." required />
      </div>

      <button type="submit" className={styles.submit}>
        Enviar solicitação
      </button>

      <p className={styles.note}>
        Estrutura pronta para integração futura com WhatsApp API, e-mail transacional ou CMS.
      </p>
    </form>
  );
}
