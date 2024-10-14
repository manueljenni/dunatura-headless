import CheckmarkItem from "../custom/CheckmarkItem";

export default function FAQ() {
  return (
    <div className="flex justify-center items-center my-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-6 bg-lightBackground max-w-[1200px]">
        <CheckmarkItem text="Unsere Produkte sind diabetikerfreundlich und enthalten keine Zucker." />
        <CheckmarkItem text="Du bekommst 5 Tage vor deiner nächsten Lieferung Bescheid und kannst deine Lieferung jederzeit ändern." />
        <CheckmarkItem text="Die Zutaten der Tagespacks kannst du jederzeit in dem Kundenportal anpassen." />
        <CheckmarkItem text="Wir liefern in Deutschland und Österreich - auch in die Schweiz auf Anfrage." />
      </div>
    </div>
  );
}
