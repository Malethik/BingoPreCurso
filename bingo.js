class BingoGame {
    constructor() {
        this.players = [];
        this.maxScore = 1000;
    }

    createRandomNumber() {
        return Math.floor(Math.random() * 89) + 1;
    }

    createBingoCard() {
        const card = [];
        while (card.length < 5) {
            const randomNumber = this.createRandomNumber();
            if (!card.includes(randomNumber)) {
                card.push(randomNumber);
            }
        }
        return card.sort((a, b) => a - b); // Ordenar los números de menor a mayor
    }

    displayPointsSystem() {
        console.log('Sistema de Puntos:');
        console.log('Menos turnos = Más puntos');
        console.log('-----------------------');
    }

    newTurn(bingoCard, randomNumber) {
        for (let i = 0; i < bingoCard.length; i++) {
            if (bingoCard[i] === randomNumber) {
                bingoCard[i] = "x";
                return true;
            }
        }
        return false;
    }

    playBingo(player) {
        const userBingoCard = this.createBingoCard();
        let turns = 0;

        console.log(`¡Bienvenido al juego de Bingo, ${player}!`);
        console.log('Cartón actual:', userBingoCard);

        while (true) {
            const randomNum = this.createRandomNumber();
            turns++;

            if (this.newTurn(userBingoCard, randomNum)) {
                console.log(`Número ${randomNum} encontrado en el cartón. Nuevo cartón:`, userBingoCard);

                const answer = prompt('¿Quieres continuar con este cartón? (yes/no)');
                if (answer.toLowerCase() !== 'yes') {
                    userBingoCard = this.createBingoCard(); // Generar un nuevo cartón
                    console.log('Nuevo cartón generado:', userBingoCard);
                }
            }
            console.log(`¡Bingo completado en ${turns} turnos!`);
            const points = this.maxScore - turns; // Sistema de puntos
            console.log(`Puntuación final: ${points} puntos`);

            this.players.push({ name: player, score: points });
            this.displayRanking();
        }
    }


    displayRanking() {
        console.log('Ranking de jugadores:');
        this.players.sort((a, b) => b.score - a.score).forEach((player, index) => {
            console.log(`${index + 1}. ${player.name} - ${player.score} puntos`);
        });
    }
}


const bingoGame = new BingoGame();
bingoGame.displayPointsSystem();

let numberOfPlayers = prompt('Ingrese el número de jugadores:');
numberOfPlayers = parseInt(numberOfPlayers);

for (let i = 0; i < numberOfPlayers; i++) {
    const playerName = prompt(`Ingrese el nombre del jugador ${i + 1}:`);
    bingoGame.playBingo(playerName);
}
