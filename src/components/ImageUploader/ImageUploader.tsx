import styles from "./ImageUploader.module.css";

type ImageUploaderProps = {
  label?: string;
};

export function ImageUploader({ label = "Imagem do trabalho" }: ImageUploaderProps) {
  return (
    <label className={styles.uploader}>
      <span>{label}</span>
      <input type="file" accept="image/*" />
      <small>Preparado para integrar com storage (S3/Cloudinary) no próximo passo.</small>
    </label>
  );
}
