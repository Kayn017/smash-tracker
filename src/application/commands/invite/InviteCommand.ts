import { Command } from "@sapphire/framework";
import { ChatInputCommandInteraction } from "discord.js";


export default class InviteCommand extends Command {
    public constructor(context: Command.LoaderContext, options: Command.Options) {
        super(context, {
            ...options,
            name: "invite",
            description: "Génère un lien d'invitation pour le bot.",
            fullCategory: ["General"]
        });
    }

    public override async chatInputRun(interaction: ChatInputCommandInteraction) {
        const link = `https://discord.com/oauth2/authorize?client_id=${interaction.client.user?.id}&scope=bot+applications.commands&permissions=8`;

        return interaction.reply({ content: `Voici le lien d'invitation du bot : ${link}`, ephemeral: true });
    }

    public override registerApplicationCommands(registry: Command.Registry) {
        registry.registerChatInputCommand(builder => {
            builder
                .setName(this.name)
                .setDescription(this.description);
                // TODO : déclarer la commande pour le guild de dev si en dev
        })
    }
}