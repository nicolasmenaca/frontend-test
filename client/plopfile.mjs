export default function (plop) {
    plop.setGenerator("component", {
        description: "Crea un nuevo componente React con archivo .tsx",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "Nombre del componente:"
            }
        ],
        actions: [
            {
                type: "add",
                path: "src/components/{{pascalCase name}}.tsx",
                templateFile: "plop-templates/component.hbs"
            }
        ]
    });
}
