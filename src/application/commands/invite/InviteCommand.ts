import { Command } from "@sapphire/framework";
import { ChatInputCommandInteraction, MessageFlags, SlashCommandBuilder } from "discord.js";

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

        return interaction.reply({ 
            content: `Voici le lien d'invitation du bot : ${link}`, 
            flags: MessageFlags.Ephemeral 
        });
    }

    public override registerApplicationCommands(registry: Command.Registry) {
        const builderFn = (builder: SlashCommandBuilder) => {
            builder
                .setName(this.name)
                .setDescription(this.description);
        }
        
        registry.registerChatInputCommand(builderFn, {
            guildIds: this.container.config.get("NODE_ENV") === "development" && typeof this.container.config.get("DISCORD_DEV_GUILD_ID") === "string"
                ? [this.container.config.get("DISCORD_DEV_GUILD_ID") as string]
                : undefined,
            idHints: this.container.config.get("NODE_ENV") === "development" && typeof this.container.config.get("DISCORD_DEV_GUILD_ID") === "string"
                ? []
                : ["1424524704580112514"] // TODO : a garder ou pas ? 
        })
    }
}