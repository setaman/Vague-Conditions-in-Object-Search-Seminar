export default (interaction, text) => {
    console.log(`%c${interaction.toUpperCase()} %c${text}`, `color: #7B68EE; 
                                                            font-weight: bold; 
                                                            font-family: "Montserrat"; 
                                                            font-size: 30px; 
                                                            background-color: #00FA9A;
                                                            padding:12px;
                                                            margin-top: 20px`,
                                                            `color: white; 
                                                            font-weight: normal; 
                                                            font-family: "Montserrat"; 
                                                            font-size: 15px; 
                                                            background-color: #6495ED;
                                                            padding:5px;
                                                            margin-bottom: 20px`);
}